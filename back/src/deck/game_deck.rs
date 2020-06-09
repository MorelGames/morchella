use std::collections::VecDeque;
use std::iter::Cycle;

use rand::rngs::ThreadRng;
use rand::seq::SliceRandom;
use rand::thread_rng;

use regex::{Regex, Captures};

use crate::deck::deck::Deck;
use crate::deck::card::{WhiteCard, BlackCard};

/// This is a generated white card.
/// It's the same as a white card, but with every generation
/// placeholder filled up. This card is ready to be used for
/// a game.
#[derive(Debug, Clone)]
pub struct GeneratedWhiteCard {
    pub text: String
}

/// This is a generated black card.
/// It's the same as a white card, but with every generation
/// placeholder filled up. This card is ready to be used for
/// a game.
#[derive(Debug, Clone)]
pub struct GeneratedBlackCard {
    pub text: String,
    pub pick: u8,
    pub is_answer: bool
}

/// This is a deck of cards for a real game. It contains cards
/// from all decks we want to use in the game, merged and shuffled.
/// Also, generated cards are… generated, and ready to be used.
#[derive(Debug, Clone)]
pub struct GameDeck {
    pub white_cards_pool: VecDeque<GeneratedWhiteCard>,
    pub black_cards_pool: VecDeque<GeneratedBlackCard>,

    used_white_cards: Vec<GeneratedWhiteCard>,
    used_black_cards: Vec<GeneratedBlackCard>
}

impl GameDeck {
    pub fn from_decks(decks: Vec<&Deck>, players: Vec<String>) -> Self {
        let mut rng = thread_rng();

        GameDeck {
            white_cards_pool: shuffle_deck(decks.iter()
                .flat_map(|deck| (&deck.white_cards).into_iter())
                .flat_map(|card| GameDeck::generate_white_card(card, &players, &mut rng))
                .collect(), &mut rng),
            black_cards_pool: shuffle_deck(decks.iter()
                .flat_map(|deck| (&deck.black_cards).into_iter())
                .flat_map(|card| GameDeck::generate_black_card(card, &players, &mut rng))
                .collect(), &mut rng),
            used_white_cards: vec![],
            used_black_cards: vec![]
        }
    }

    /// From a white card and the players list, generates white cards according to the
    /// generation rules. If the card is not to be generated, returns itself in a one-element
    /// vec. Else, generates as many as required versions of the card.
    fn generate_white_card(card: &WhiteCard, players: &Vec<String>, mut rng: &mut ThreadRng) -> Vec<GeneratedWhiteCard> {
        if !card.is_generated {
            return vec![GeneratedWhiteCard {
                text: card.text.clone()
            }];
        }

        let mut players_pool = shuffle_players(players, &mut rng);

        let versions = match card.generated_versions {
            -1 => players.len(),
            _ => card.generated_versions as usize
        };

        (0..versions)
            .map(|_| GeneratedWhiteCard {
                text: GameDeck::generate_card_text(&card.text, &mut players_pool)
            })
            .collect()
    }

    /// From a white card and the players list, generates white cards according to the
    /// generation rules. If the card is not to be generated, returns itself in a one-element
    /// vec. Else, generates as many as required versions of the card.
    fn generate_black_card(card: &BlackCard, players: &Vec<String>, mut rng: &mut ThreadRng) -> Vec<GeneratedBlackCard> {
        if !card.is_generated {
            return vec![GeneratedBlackCard {
                text: card.text.clone(),
                pick: card.pick,
                is_answer: card.is_answer
            }];
        }

        let mut players_pool = shuffle_players(players, &mut rng);

        let versions = match card.generated_versions {
            -1 => players.len(),
            _ => card.generated_versions as usize
        };

        (0..versions)
            .map(|_| GeneratedBlackCard {
                text: GameDeck::generate_card_text(&card.text, &mut players_pool),
                pick: card.pick,
                is_answer: card.is_answer
            })
            .collect()
    }

    /// From a text woth placeholders and an infinite iterator of players names, generates a single
    /// card, advancing the players name iterator.
    fn generate_card_text(card_text: &String, players: &mut Cycle<std::vec::IntoIter<String>>) -> String {
        lazy_static! {
            static ref PLACEHOLDER_REGEX: Regex = Regex::new(r"\{name\}").unwrap();
        }

        PLACEHOLDER_REGEX.replace_all(card_text.as_str(), |_caps: &Captures| players.next().unwrap().clone()).to_string()
    }

    /// Ensures that we can draw `cap` cards from the white deck.
    /// If we cannot do that, remaining cards are saved apart, then usec cards are shuffled and
    /// placed back into the cards pool. Then, still unused cards are placed at the top of the
    /// pool, so every card is used with an equal probability. This also ensures there is no risk
    /// of duplicated card when we reach the end of the deck while drawing cards.
    fn ensure_white_cards_capacity(&mut self, cap: usize) {
        if self.white_cards_pool.len() < cap {
            let remaining_cards: Vec<GeneratedWhiteCard> = (0..self.white_cards_pool.len()).filter_map(|_| self.white_cards_pool.pop_back()).collect();

            self.white_cards_pool = shuffle_deck(self.used_white_cards.clone(), &mut thread_rng());
            remaining_cards.iter().for_each(|card| self.white_cards_pool.push_front(card.clone()));

            self.used_white_cards.clear();
        }
    }

    /// Draws a white card from the deck. If every card in the deck is used, used card are
    /// re-shuffled then re-used.
    pub fn draw_white_card(&mut self) -> GeneratedWhiteCard {
        self.ensure_white_cards_capacity(1);

        match self.white_cards_pool.pop_front() {
            Some(card) => {
                self.used_white_cards.push(card.clone());
                card
            },
            None => unreachable!()
        }
    }

    /// Draws a certain amount of white cards.
    pub fn draw_white_cards(&mut self, amount: usize) -> Vec<GeneratedWhiteCard> {
        self.ensure_white_cards_capacity(amount);

        (0..amount).map(|_| self.draw_white_card()).collect()
    }

    /// Draws a black card from the deck. If every card in the deck is used, used card are
    /// re-shuffled then re-used.
    pub fn draw_black_card(&mut self) -> GeneratedBlackCard {
        if self.black_cards_pool.is_empty() {
            self.black_cards_pool = shuffle_deck(self.used_black_cards.clone(), &mut thread_rng());
            self.used_black_cards.clear();
        }

        match self.black_cards_pool.pop_front() {
            Some(card) => {
                self.used_black_cards.push(card.clone());
                card
            },
            None => unreachable!()
        }
    }
}

fn shuffle_players(players: &Vec<String>, mut rng: &mut ThreadRng) -> Cycle<std::vec::IntoIter<String>> {
    let mut players_pool: Vec<String> = players.clone();
    players_pool.shuffle(&mut rng);

    players_pool.into_iter().cycle()
}

fn shuffle_deck<T>(deck: Vec<T>, mut rng: &mut ThreadRng) -> VecDeque<T> {
    let mut deck: Vec<T> = deck;
    deck.shuffle(&mut rng);

    deck.into_iter().collect()
}

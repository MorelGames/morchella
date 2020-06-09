use std::collections::HashMap;

use crate::deck::deck::Deck;
use crate::deck::game_deck::GameDeck;
use crate::deck::raw::Deck as RawDeck;

#[derive(Debug)]
pub struct Decks {
    pub decks: HashMap<String, Deck>
}

impl From<Vec<RawDeck>> for Decks {
    fn from(raw_decks: Vec<RawDeck>) -> Self {
        Decks {
            decks: raw_decks.into_iter().map(|deck| deck.into()).map(|deck: Deck| (deck.id.clone(), deck)).collect()
        }
    }
}

impl Decks {
    pub fn len(&self) -> usize {
        self.decks.len()
    }

    /// Returns the cards count in all decks, in a tuple:
    /// ```(black cards count, white cards count)```
    pub fn count_cards(&self) -> (usize, usize) {
        self.decks.iter().fold((0, 0), |acc, deck| (acc.0 + deck.1.black_cards.len(), acc.1 + deck.1.white_cards.len()))
    }

    pub fn generate_game_deck(&self, decks: Vec<String>, players: Vec<String>) -> GameDeck {
        GameDeck::from_decks(
            decks.into_iter().filter_map(|id| self.decks.get(&id)).collect(),
            players
        )
    }
}

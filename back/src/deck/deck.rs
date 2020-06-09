use slugify::slugify;

use crate::deck::card::WhiteCard;
use crate::deck::card::BlackCard;
use crate::deck::raw::Deck as RawDeck;

#[derive(Debug, Clone)]
pub struct Deck {
    pub id: String,
    pub name: String,
    pub official: bool,
    pub locale: String,
    pub white_cards: Vec<WhiteCard>,
    pub black_cards: Vec<BlackCard>
}

impl From<RawDeck> for Deck {
    fn from(raw_deck: RawDeck) -> Self {
        Deck {
            id: slugify!(format!("{}-{}", raw_deck.locale, raw_deck.name).as_str()),
            name: raw_deck.name.clone(),
            official: raw_deck.official,
            locale: raw_deck.locale.clone(),
            white_cards: raw_deck.cards.white.into_iter().map(|card| card.into()).collect(),
            black_cards: raw_deck.cards.black.into_iter().map(|card| card.into()).collect()
        }
    }
}

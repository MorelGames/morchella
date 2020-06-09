use std::cmp::max;

use crate::deck::raw::BlackCard as RawBlackCard;
use crate::deck::raw::WhiteCard as RawWhiteCard;

#[derive(Debug, Clone)]
pub struct WhiteCard {
    pub text: String,
    pub is_generated: bool,
    pub generated_versions: i8
}

impl From<RawWhiteCard> for WhiteCard {
    fn from(raw_card: RawWhiteCard) -> Self {
        match raw_card {
            RawWhiteCard::Simple(text) => Self {
                text: text.clone(),
                is_generated: is_card_generated(&text),
                generated_versions: 2
            },
            RawWhiteCard::WithMetadata { text, generated_versions } => Self {
                text: text.clone(),
                is_generated: is_card_generated(&text),
                generated_versions: match generated_versions {
                    0 => 2,
                    _ => generated_versions
                }
            }
        }
    }
}

#[derive(Debug, Clone)]
pub struct BlackCard {
    pub text: String,
    pub pick: u8,
    pub is_answer: bool,
    pub is_generated: bool,
    pub generated_versions: i8
}

impl From<RawBlackCard> for BlackCard {
    fn from(raw_card: RawBlackCard) -> Self {
        match raw_card {
            RawBlackCard::Simple(text) => Self {
                text: text.clone(),
                pick: calculate_picks(&text),
                is_answer: is_black_card_answer_only(&text),
                is_generated: is_card_generated(&text),
                generated_versions: 2
            },
            RawBlackCard::WithMetadata { text, pick, generated_versions } => Self {
                text: text.clone(),
                pick: match pick {
                    0 => calculate_picks(&text),
                    _ => pick
                },
                is_answer: is_black_card_answer_only(&text),
                is_generated: is_card_generated(&text),
                generated_versions: match generated_versions {
                    0 => 2,
                    _ => generated_versions
                }
            }
        }
    }
}

/// Checks if a card contains a generation placeholder.
fn is_card_generated(text: &String) -> bool {
    text.contains("{name}")
}

/// Checks if the given black card is answers only, i.e. if there is
/// no placeholder inside, so the corresponding white card is an “answer”
/// to the card.
fn is_black_card_answer_only(text: &String) -> bool {
    !text.contains("_")
}

fn calculate_picks(text: &String) -> u8 {
    max(text.matches("_").count() as u8, 1)
}

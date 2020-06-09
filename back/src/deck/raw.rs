use std::io::Read;

use failure::Error;
use failure::ResultExt;

use serde_json;

#[inline(always)]
fn default_zero() -> u8 {
    0
}

#[inline(always)]
fn default_zero_signed() -> i8 {
    0
}


#[inline(always)]
fn default_false() -> bool {
    false
}

/// A black card.
/// In the card's text, the blanks are represented using a single
/// underscore. If there is no underscore, the card will be a card without
/// blanks, but with an answer. HTML formatting is allowed.
///
/// # Generated cards
///
/// Generated cards are cards that are processed when a game is created, replacing
/// placeholder in them by real players names. For a card to be generated, there must
/// be somewhere such a placeholder. The placeholder is `{name}`.
///
/// As example, this card is generated:
///
/// > What's {name}'s secret power?
///
/// …and this one is not:
///
/// > What's my secret power?
///
/// By default, when a game is created, each generated card will be
/// added twice, with two different names. This value can be configured
/// with the complete card form (using a dict instead of a string), with
/// the `generated_versions` entry. If `0`, the default value is used (two
/// cards generated). if `-1`, a card is generated for every player. Else,
/// the given amount will be generated.
#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum BlackCard {
    /// A black card with only one blank. The string is the card's text.
    /// The amount of blanks in the card will be automatically computed by
    /// counting the `_` in the text.
    Simple(String),

    /// A black card with one or multiple blanks.
    WithMetadata {
        /// The card's text.
        text: String,

        /// The amount of blanks in the card. If `0`, blanks will
        /// be automatically counted.
        #[serde(default = "default_zero")]
        pick: u8,

        /// The amount of generated cards (if this is a generated card).
        /// Ignored if the card is not generated (does not contain a placeholder).
        #[serde(default = "default_zero_signed")]
        generated_versions: i8
    }
}

/// A white card.
/// These are standard cards, nothing special about them. HTML formatting is allowed.
///
/// # Generated cards
///
/// Generated cards are cards that are processed when a game is created, replacing
/// placeholder in them by real players names. For a card to be generated, there must
/// be somewhere such a placeholder. The placeholder is `{name}`.
///
/// As example, this card is generated:
///
/// > {name} issues.
///
/// …and this one is not:
///
/// > Being on fire.
///
/// By default, when a game is created, each generated card will be
/// added twice, with two different names. This value can be configured
/// with the complete card form (using a dict instead of a string), with
/// the `generated_versions` entry. If `0`, the default value is used (two
/// cards generated). if `-1`, a card is generated for every player. Else,
/// the given amount will be generated.
#[derive(Serialize, Deserialize, Debug)]
#[serde(untagged)]
pub enum WhiteCard {
    /// A simple white card with nothing special.
    Simple(String),

    /// A white card with some metadata.
    WithMetadata {
        /// The text of the white card.
        text: String,

        /// The amount of generated cards (if this is a generated card).
        /// Ignored if the card is not generated (does not contain a placeholder).
        #[serde(default = "default_zero_signed")]
        generated_versions: i8
    }
}

/// The cards of a deck.
#[derive(Serialize, Deserialize, Debug)]
pub struct DeckCards {
    pub black: Vec<BlackCard>,
    pub white: Vec<WhiteCard>
}

/// A deck.
#[derive(Serialize, Deserialize, Debug)]
pub struct Deck {
    /// The public (and displayable) name of the deck.
    pub name: String,

    /// `true` if this deck is an official deck from CAH or other.
    #[serde(default = "default_false")]
    pub official: bool,

    /// The locale of this deck (`fr`, `en`…)
    pub locale: String,

    /// The cards in this deck.
    pub cards: DeckCards
}

/// Reads a JSON deck into this raw structure, from a reader.
pub fn read_deck<R: Read>(reader: R) -> Result<Deck, Error> {
    Ok(serde_json::from_reader(reader).context("Unable to parse deck data")?)
}

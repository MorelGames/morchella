#[macro_use] extern crate failure;
extern crate glob;
#[macro_use] extern crate lazy_static;
extern crate regex;
extern crate serde;
#[macro_use] extern crate serde_derive;
extern crate serde_json;
extern crate slugify;

pub mod deck;

use std::fs::File;
use std::path::Path;

use failure::Error;
use failure::ResultExt;

use glob::glob_with;
use glob::MatchOptions;

use deck::error::DecksError;

pub fn read_raw_deck_from_file(path: &Path) -> Result<deck::raw::Deck, Error> {
    let file = File::open(path).with_context(|_| format!("Unable to open deck JSON file '{}'", path.display()))?;
    Ok(deck::raw::read_deck(file).with_context(|_| format!("Unable to load deck JSON file '{}'", path.display()))?)
}

pub fn read_decks_from_folder(path: &Path) -> Result<Vec<deck::raw::Deck>, Error> {
    if !(path).is_dir() {
        Err(DecksError::NotADirectory { path: path.to_str().unwrap().to_string() })?;
    }

    let options = MatchOptions {
        case_sensitive: false,
        require_literal_separator: false,
        require_literal_leading_dot: false
    };

    glob_with(format!("{}/**/*.json", path.to_str().unwrap()).as_str(), options)
        .expect("Failed to read glob pattern")
        .into_iter()
        .filter_map(Result::ok)
        .map(|path| read_raw_deck_from_file(&path))
        .collect()
}

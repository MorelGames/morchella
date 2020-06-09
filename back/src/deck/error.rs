#[derive(Debug, Fail)]
pub enum DecksError {
    #[fail(display = "The decks root path '{}' must be a directory; it's not.", path)]
    NotADirectory { path: String }
}

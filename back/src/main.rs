extern crate cah;

use std::path::Path;
use std::time::Instant;

use cah::read_decks_from_folder;
use cah::deck::decks::Decks;

fn main() {
    let t = Instant::now();
    let decks: Decks = read_decks_from_folder(Path::new("./decks")).unwrap().into();
    let e = t.elapsed();

    let counts = decks.count_cards();

    println!("\nLoaded {} decks, with {} black and {} white cards, in {:?}.", decks.len(), counts.0, counts.1, e);

    let t = Instant::now();

    let mut game_deck = decks.generate_game_deck(
        vec![
            "en-misprint-replacement-bonus-cards".to_string(),
            "en-base-set".to_string(),
            "en-science-pack".to_string(),
            "en-missing".to_string()
        ],
        vec![
            "Amaury".to_string(),
            "PM".to_string(),
            "Chostfiller".to_string(),
            "Jenjeur".to_string(),
            "Vlammar".to_string(),
            "ordstir".to_string(),
            "Ceeburst".to_string(),
            "Miruku".to_string()
        ]
    );

    let e = t.elapsed();

    println!("\nBLACK CARDS");
    game_deck.black_cards_pool.iter().inspect(|card| println!("- [{}] {}", card.pick, card.text)).for_each(drop);

    println!("\nWHITE CARDS");
    game_deck.white_cards_pool.iter().inspect(|card| println!("- {}", card.text)).for_each(drop);

    println!("\nGenerated game deck in {:?}.", e);

    println!("\nBLACK CARD\n{}", game_deck.draw_black_card().text);

    for i in 1..13 {
        println!("\n[{}] YOUR WHITE CARDS", i);
        game_deck.draw_white_cards(10).iter().inspect(|card| println!("- {}", card.text)).for_each(drop);
    }
}

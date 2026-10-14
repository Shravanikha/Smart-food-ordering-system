package com.food.food_ordering_system;

public class fooditem {
    private int id;
    private String name;
    private double price;
    private String category;
    private boolean available;

    public fooditem(int id, String name, double price,
                    String category, boolean available) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.available = available;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
    public boolean isAvailable() { return available; }
}
    


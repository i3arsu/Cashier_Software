package net.unipu.CashierSoftwareAPI.payload.response;


import net.unipu.CashierSoftwareAPI.models.Item;

public class ItemResponse {
    private String id;
    private String name;
    private float price;
    private String category;

    public ItemResponse(String id, String name, float price, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public ItemResponse(Item item) {
        this.id = item.getId().toString();
        this.name = item.getName();
        this.price = item.getPrice();
        this.category = item.getCategory().getName().name();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }



}
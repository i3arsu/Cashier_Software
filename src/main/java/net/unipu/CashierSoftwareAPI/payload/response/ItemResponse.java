package net.unipu.CashierSoftwareAPI.payload.response;

import net.unipu.CashierSoftwareAPI.models.Item;

import java.util.List;

public class ItemResponse {
    private List<Item> items;

    public ItemResponse(List<Item> items) {
        this.items = items;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
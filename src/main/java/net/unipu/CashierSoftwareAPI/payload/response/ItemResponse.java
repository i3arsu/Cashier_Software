package net.unipu.CashierSoftwareAPI.payload.response;

import net.unipu.CashierSoftwareAPI.models.Item;

import java.util.List;

public class ItemResponse {
    private Item item;

    public ItemResponse(Item item) {
        this.item = item;
    }

    public Item getItem() {
        return item;
    }

    public void setItems(Item item) {
        this.item = item;
    }
}
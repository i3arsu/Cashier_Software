package net.unipu.CashierSoftwareAPI.payload.response;

import java.util.HashMap;
import java.util.Map;

public class ItemResponse {
    private Map<String, Float> map;

    public ItemResponse(Map<String, Float> map) {
        this.map = map;
    }

    public Map<String, Float> getMessage() {
        return map;
    }

    public void setMessage(Map<String, Float> map) {
        this.map = map;
    }
}
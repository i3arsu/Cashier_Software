package net.unipu.CashierSoftwareAPI.payload.request;

import javax.validation.constraints.Size;
import java.util.List;

public class ItemRequest {
    private List<Long> ids;

    @Size(max = 50)
    private List<String> names;

    private List<Float> prices;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    public List<String> getNames() {
        return names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public List<Float> getPrices() {
        return prices;
    }

    public void setPrices(List<Float> prices) {
        this.prices = prices;
    }
}

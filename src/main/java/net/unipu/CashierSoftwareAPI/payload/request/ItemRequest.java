package net.unipu.CashierSoftwareAPI.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ItemRequest {
    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}

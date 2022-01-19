package net.unipu.CashierSoftwareAPI.controllers;

import net.unipu.CashierSoftwareAPI.models.Item;
import net.unipu.CashierSoftwareAPI.payload.request.ItemRequest;
import net.unipu.CashierSoftwareAPI.payload.response.ItemResponse;
import net.unipu.CashierSoftwareAPI.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/id")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getItemById(@Valid @RequestBody ItemRequest itemRequest) {
        Map<String,Float> map = new HashMap<>();
        if (itemRequest.getIds().isEmpty()) {
            for (Item item : itemRepository.findAll()){
                map.put(item.getName(),item.getPrice());
            }
            return ResponseEntity.ok(new ItemResponse(map));
        }
        for (Long id : itemRequest.getIds()) {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Item not found"));
            map.put(item.getName(),item.getPrice());
        }
        return ResponseEntity.ok(new ItemResponse(map));
    }
}

package net.unipu.CashierSoftwareAPI.controllers;

import net.unipu.CashierSoftwareAPI.models.Item;
import net.unipu.CashierSoftwareAPI.payload.request.ItemRequest;
import net.unipu.CashierSoftwareAPI.payload.response.ItemResponse;
import net.unipu.CashierSoftwareAPI.payload.response.MessageResponse;
import net.unipu.CashierSoftwareAPI.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/item")
public class ItemController {
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getItemById(@PathVariable("id") long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Item not found"));
        return ResponseEntity.ok(new ItemResponse(item));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllItem() {
        List<ItemResponse> items = new ArrayList<>(itemRepository.findAll().stream().map(ItemResponse::new).toList());
        return ResponseEntity.ok(items);
    }

    @PostMapping("/all")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> postItemById(@Valid @RequestBody ItemRequest itemRequest) {
        if (itemRequest.getPrices().size() != itemRequest.getNames().size()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid number of arguments!"));
        }

        for (int i = 0; i<itemRequest.getPrices().size();i++) {
            Item item = new Item(itemRequest.getNames().get(i), itemRequest.getPrices().get(i));
            itemRepository.save(item);
        }

        return ResponseEntity.ok(new MessageResponse("Items registered successfully!"));
    }

    @PatchMapping("/all")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> patchItemPriceById(@Valid @RequestBody ItemRequest itemRequest) {

        if (itemRequest.getIds().isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: No ids given!"));
        }
        if (itemRequest.getPrices() == null) {
            if (itemRequest.getIds().size() != itemRequest.getNames().size()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid number of arguments!"));
            }
        }
        else if (itemRequest.getNames() == null) {
            if (itemRequest.getIds().size() != itemRequest.getPrices().size()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid number of arguments!"));
            }
        }
        else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid number of arguments!"));
        }

        for (int i = 0; i<itemRequest.getIds().size();i++) {
            Item item = itemRepository.findById(itemRequest.getIds().get(i))
                    .orElseThrow(() -> new RuntimeException("Error: Item not found"));
            if (itemRequest.getNames() == null) {
                item.setPrice(itemRequest.getPrices().get(i));
            }
            else if (itemRequest.getPrices() == null) {
                item.setName(itemRequest.getNames().get(i));
            }

            itemRepository.save(item);

        }
        return ResponseEntity.ok(new MessageResponse("Items updated successfully!"));

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteItemById(@PathVariable("id") long id) {
        itemRepository.delete(itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Item not found")));
        return ResponseEntity.ok(new MessageResponse("Items deleted successfully!"));
    }
}

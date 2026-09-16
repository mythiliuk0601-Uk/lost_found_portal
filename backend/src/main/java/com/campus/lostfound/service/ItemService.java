package com.campus.lostfound.service;

import java.time.Instant;
import java.util.List;
import com.campus.lostfound.model.Item;
import com.campus.lostfound.repository.ItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ItemService {
    private final ItemRepository items;
    public ItemService(ItemRepository items) { this.items = items; }

    public Item create(Item item, String email, String type) {
        item.setType(type); item.setStatus("ACTIVE"); item.setReportedBy(email); item.setCreatedAt(Instant.now());
        return items.save(item);
    }

    public List<Item> search(String search, String category, String type) {
        return items.findAll().stream().filter(item -> search == null || search.isBlank() || item.getItemName().toLowerCase().contains(search.toLowerCase()))
                .filter(item -> category == null || category.isBlank() || category.equalsIgnoreCase(item.getCategory()))
                .filter(item -> type == null || type.isBlank() || type.equalsIgnoreCase(item.getType())).toList();
    }

    public Item one(String id) { return items.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found")); }
    public List<Item> mine(String email) { return items.findByReportedByOrderByCreatedAtDesc(email); }
    public Item returned(String id, String email) { Item item = one(id); if (!item.getReportedBy().equals(email)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the reporter can update this item"); item.setStatus("RETURNED"); return items.save(item); }
}

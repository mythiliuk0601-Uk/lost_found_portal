package com.campus.lostfound.controller;

import java.util.List;
import com.campus.lostfound.model.Item;
import com.campus.lostfound.service.AuthService;
import com.campus.lostfound.service.ItemService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService service; private final AuthService auth;
    public ItemController(ItemService service, AuthService auth) { this.service = service; this.auth = auth; }

    @GetMapping public List<Item> all(@RequestParam(required = false) String search, @RequestParam(required = false) String category, @RequestParam(required = false) String type) { return service.search(search, category, type); }
    @GetMapping("/{id}") public Item one(@PathVariable String id) { return service.one(id); }
    @PostMapping("/lost") public Item lost(@RequestHeader("Authorization") String token, @RequestBody Item item) { return service.create(item, auth.emailFrom(token), "LOST"); }
    @PostMapping("/found") public Item found(@RequestHeader("Authorization") String token, @RequestBody Item item) { return service.create(item, auth.emailFrom(token), "FOUND"); }
    @GetMapping("/my-reports") public List<Item> mine(@RequestHeader("Authorization") String token) { return service.mine(auth.emailFrom(token)); }
    @PatchMapping("/{id}/returned") public Item returned(@PathVariable String id, @RequestHeader("Authorization") String token) { return service.returned(id, auth.emailFrom(token)); }
}

package com.campus.lostfound.repository;

import java.util.List;
import com.campus.lostfound.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByReportedByOrderByCreatedAtDesc(String email);
}

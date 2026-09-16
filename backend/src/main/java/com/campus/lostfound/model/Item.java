package com.campus.lostfound.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("items")
public class Item {
    @Id private String id;
    private String itemName;
    private String category;
    private String description;
    private String type;
    private String date;
    private String location;
    private String imageUrl;
    private String status;
    private String reportedBy;
    private Instant createdAt;

    public String getId() { return id; }
    public String getItemName() { return itemName; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getType() { return type; }
    public String getDate() { return date; }
    public String getLocation() { return location; }
    public String getImageUrl() { return imageUrl; }
    public String getStatus() { return status; }
    public String getReportedBy() { return reportedBy; }
    public Instant getCreatedAt() { return createdAt; }
    public void setId(String id) { this.id = id; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setType(String type) { this.type = type; }
    public void setDate(String date) { this.date = date; }
    public void setLocation(String location) { this.location = location; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setStatus(String status) { this.status = status; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

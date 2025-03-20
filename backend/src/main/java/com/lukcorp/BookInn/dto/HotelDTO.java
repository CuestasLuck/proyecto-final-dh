package com.lukcorp.BookInn.dto;

import java.util.List;

public class HotelDTO {
    private Long id;
    private String name;
    private String city;
    private String country;
    private double pricePerNight;
    private double rating;
    private String description;
    private Long categoryId;
    private List<Long> featureIds;
    private List<String> imageUrls;


    public HotelDTO(Long id, String name, String city, String country, double pricePerNight, double rating, String description, Long categoryId, List<Long> featureIds, List<String> imageUrls) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.pricePerNight = pricePerNight;
        this.rating = rating;
        this.description = description;
        this.categoryId = categoryId;
        this.featureIds = featureIds;
        this.imageUrls = imageUrls;
    }

    public HotelDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public List<Long> getFeatureIds() {
        return featureIds;
    }

    public void setFeatureIds(List<Long> featureIds) {
        this.featureIds = featureIds;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}

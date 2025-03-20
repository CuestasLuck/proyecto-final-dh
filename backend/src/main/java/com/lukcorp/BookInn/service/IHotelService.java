package com.lukcorp.BookInn.service;

import com.lukcorp.BookInn.dto.HotelDTO;
import com.lukcorp.BookInn.entity.Hotel;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IHotelService {
    Hotel save(Hotel hotel) throws Exception;
    Optional<Hotel> findById(Long id);
    Optional<Hotel> findByName(String name);
    void update(Hotel hotel);
    void delete(Long id);
    List<Hotel> listAll();
    List<Hotel> addHotels(List<Hotel> hotels);
    List<HotelDTO> getAllHotels();
    List<HotelDTO> getHotelsByCategories(List<Long> categoryIds);
}

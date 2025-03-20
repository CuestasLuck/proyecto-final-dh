package com.lukcorp.BookInn.service.impl;

import com.lukcorp.BookInn.dto.HotelDTO;
import com.lukcorp.BookInn.entity.Hotel;
import com.lukcorp.BookInn.exception.HotelAlreadyExistsException;
import com.lukcorp.BookInn.repository.IHotelRepository;
import com.lukcorp.BookInn.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelService implements IHotelService {
    private IHotelRepository hotelRepository;

    @Autowired
    public HotelService(IHotelRepository hotelRepository){
        this.hotelRepository = hotelRepository;
    }

    @Override
    public Hotel save(Hotel hotel) throws Exception {
        return hotelRepository.save(hotel);
    }

    @Override
    public Optional<Hotel> findById(Long id) {
        return hotelRepository.findById(id);
    }

    @Override
    public Optional<Hotel> findByName(String name) {
        return hotelRepository.findByName(name);
    }

    @Override
    public void update(Hotel hotel) {
        hotelRepository.save(hotel);
    }

    @Override
    public void delete(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public List<Hotel> listAll() {
        return hotelRepository.findAll();
    }

    public List<Hotel> addHotels(List<Hotel> hotels) {
        return hotelRepository.saveAll(hotels);
    }

    public List<HotelDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<HotelDTO> getHotelsByCategories(List<Long> categoryIds) {
        return hotelRepository.findByCategories(categoryIds).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private HotelDTO convertToDto(Hotel hotel) {
        HotelDTO dto = new HotelDTO();
        dto.setId(hotel.getId());
        dto.setName(hotel.getName());
        dto.setCity(hotel.getCity());
        dto.setCountry(hotel.getCountry());
        dto.setRating(hotel.getRating());
        dto.setDescription(hotel.getDescription());
        dto.setPricePerNight(hotel.getPricePerNight());
        dto.setImageUrls(hotel.getImageUrls());
        dto.setCategoryId(hotel.getCategory().getId());

        return dto;
    }
}

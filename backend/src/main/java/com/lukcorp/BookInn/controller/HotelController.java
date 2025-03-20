package com.lukcorp.BookInn.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lukcorp.BookInn.dto.HotelDTO;
import com.lukcorp.BookInn.entity.Category;
import com.lukcorp.BookInn.entity.Feature;
import com.lukcorp.BookInn.entity.Hotel;
import com.lukcorp.BookInn.exception.HotelAlreadyExistsException;
import com.lukcorp.BookInn.service.ICategoryService;
import com.lukcorp.BookInn.service.IFeatureService;
import com.lukcorp.BookInn.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {
    private IHotelService hotelService;
    private ICategoryService categoryService;
    private IFeatureService featureService;

    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    @Autowired
    public HotelController(IHotelService hotelService, ICategoryService categoryService, IFeatureService featureService) {
        this.hotelService = hotelService;
        this.categoryService = categoryService;
        this.featureService = featureService;
    }

    @PostMapping
    public ResponseEntity<Hotel> save(
            @RequestParam("hotel") String hotelDtoJson,
            @RequestParam("files") List<MultipartFile> files
    ) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        HotelDTO hotelDto = objectMapper.readValue(hotelDtoJson, HotelDTO.class);
        Optional<Hotel> existingHotel = hotelService.findByName(hotelDto.getName());
        if (existingHotel.isPresent()) {
            throw new HotelAlreadyExistsException("El nombre del hotel que se esta intentando agregar ya esta asignado");
        }
        Hotel hotel = new Hotel();
        hotel.setName(hotelDto.getName());
        hotel.setCity(hotelDto.getCity());
        hotel.setCountry(hotelDto.getCountry());
        hotel.setPricePerNight(hotelDto.getPricePerNight());
        hotel.setRating(hotelDto.getRating());
        hotel.setDescription(hotelDto.getDescription());
        Optional<Category> categoryToFind = categoryService.findById(hotelDto.getCategoryId());
        if (categoryToFind.isPresent()) {
            hotel.setCategory(categoryToFind.get());
        } else {
            throw new RuntimeException("No se encontró la categoría que intentas asignar");
        }

        List<Feature> features = featureService.findAllById(hotelDto.getFeatureIds());
        hotel.setFeatures(features);
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            imageUrls.add("hotels/images/" + fileName);
        }
        hotel.setImageUrls(imageUrls);
        hotelService.save(hotel);
        return ResponseEntity.status(HttpStatus.CREATED).body(hotel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> findById(@PathVariable Long id){
        Optional<Hotel> hotel = hotelService.findById(id);
        if (hotel.isPresent()){
            return ResponseEntity.ok(hotel.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Hotel hotel) {
        Optional<Hotel> hotelToUpdate = hotelService.findById(id);
        if (hotelToUpdate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró el hotel con ID: " + id);
        }
        Optional<Category> categoryToFind = categoryService.findById(hotel.getCategory().getId());
        if (categoryToFind.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No se encontró la categoría con ID: " + hotel.getCategory().getId());
        }
        Hotel existingHotel = hotelToUpdate.get();
        existingHotel.setName(hotel.getName());
        existingHotel.setCity(hotel.getCity());
        existingHotel.setCountry(hotel.getCountry());
        existingHotel.setRating(hotel.getRating());
        existingHotel.setPricePerNight(hotel.getPricePerNight());
        existingHotel.setDescription(hotel.getDescription());
        existingHotel.setCategory(categoryToFind.get());
        hotelService.update(existingHotel);
        return ResponseEntity.ok("Se actualizó el hotel: " + existingHotel.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        Optional<Hotel> searchHotel = hotelService.findById(id);
        if (searchHotel.isPresent()) {
            Hotel hotel = searchHotel.get();
            for (String imageUrl : hotel.getImageUrls()) {
                try {
                    Path imagePath = Paths.get(UPLOAD_DIR + imageUrl.replace("hotels/images/", ""));
                    Files.deleteIfExists(imagePath);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error al eliminar una de las imágenes");
                }
            }
            hotelService.delete(id);
            return ResponseEntity.ok("Se elimino el hotel con id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel no encontrado");
        }
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> listAll() {
        return ResponseEntity.ok(hotelService.listAll());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<HotelDTO>> getHotelsByCategories(
            @RequestParam(required = false) List<Long> categoryIds) {

        List<HotelDTO> hotels;

        if (categoryIds == null || categoryIds.isEmpty()) {
            hotels = hotelService.getAllHotels();
        } else {
            hotels = hotelService.getHotelsByCategories(categoryIds);
        }

        return ResponseEntity.ok(hotels);
    }

    //PARA PROBAR FUNCIONALIDADES Y OTRAS COSAS

    @PostMapping("/save")
    public ResponseEntity<Hotel> save(@RequestBody Hotel hotel) throws Exception {
        return ResponseEntity.ok(hotelService.save(hotel));
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) throws Exception {
        Path imagePath = Paths.get(UPLOAD_DIR, fileName);
        Resource resource = new UrlResource(imagePath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @PostMapping("/hotelList")
    public ResponseEntity<List<Hotel>> addHotels(@RequestBody List<Hotel> hotels) {
        return ResponseEntity.ok(hotelService.addHotels(hotels));
    }

}

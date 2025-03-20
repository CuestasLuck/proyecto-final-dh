package com.lukcorp.BookInn.controller;

import com.lukcorp.BookInn.dto.CategoryDTO;
import com.lukcorp.BookInn.dto.HotelDTO;
import com.lukcorp.BookInn.entity.Category;
import com.lukcorp.BookInn.service.ICategoryService;
import com.lukcorp.BookInn.service.IHotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private ICategoryService categoryService;
    private IHotelService hotelService;

    @Autowired
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id){
        Optional<Category> categoryToFind = categoryService.findById(id);
        if (categoryToFind.isPresent()){
            return ResponseEntity.ok(categoryToFind.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody Category category){
        Optional<Category> categoryToUpdate = categoryService.findById(category.getId());
        ResponseEntity<String> response;
        if (categoryToUpdate.isPresent()){
            categoryService.update(category);
            response = ResponseEntity.ok("Se actualizo la categoria: " + category.getTitle());
        } else {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Optional<Category> categoryToDelete = categoryService.findById(id);
        if (categoryToDelete.isPresent()) {
            categoryService.delete(id);
            return ResponseEntity.ok("Se elimino la categoria con id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada");
        }
    }



    @GetMapping("/hotels")
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
}

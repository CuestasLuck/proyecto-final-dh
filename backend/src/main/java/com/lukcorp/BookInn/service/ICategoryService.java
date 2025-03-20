package com.lukcorp.BookInn.service;

import com.lukcorp.BookInn.dto.CategoryDTO;
import com.lukcorp.BookInn.entity.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    Category save(Category category);
    Optional<Category> findById(Long id);
    Optional<Category> findByTitle(String title);
    void update(Category category);
    void delete(Long id);
    List<Category> listAll();
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    List<CategoryDTO> getAllCategories();
}

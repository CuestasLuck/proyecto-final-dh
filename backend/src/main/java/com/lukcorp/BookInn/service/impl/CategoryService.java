package com.lukcorp.BookInn.service.impl;

import com.lukcorp.BookInn.dto.CategoryDTO;
import com.lukcorp.BookInn.entity.Category;
import com.lukcorp.BookInn.repository.ICategoryRepository;
import com.lukcorp.BookInn.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {
    private ICategoryRepository categoryRepository;

    @Autowired
    public CategoryService(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Optional<Category> findByTitle(String title) {
        return categoryRepository.findByTitle(title);
    }

    @Override
    public void update(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category(categoryDTO.getTitle(), categoryDTO.getDescription(), categoryDTO.getImageUrl());
        Category savedCategory = categoryRepository.save(category);
        return new CategoryDTO(savedCategory.getId(), savedCategory.getTitle(), savedCategory.getDescription(), savedCategory.getImageUrl());
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getTitle(), c.getDescription(), c.getImageUrl()))
                .collect(Collectors.toList());
    }
}

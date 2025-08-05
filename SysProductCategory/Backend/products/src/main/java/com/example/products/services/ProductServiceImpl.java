package com.example.products.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.products.models.entities.Product;
import com.example.products.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        if (!productRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        }
        product.setId(id);
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        }
        productRepository.deleteById(id);
    }

}

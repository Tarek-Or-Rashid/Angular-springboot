package com.tendersys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tendersys.model.Source;
import com.tendersys.repository.SourceRepository;

@RestController
@RequestMapping("/api/sources")
public class SourceController {

    @Autowired
    private SourceRepository sourceRepository;

    // Get all sources
    @GetMapping
    public List<Source> getAllSources() {
        return sourceRepository.findAll();
    }

    // Get source by id
    @GetMapping("/{id}")
    public ResponseEntity<Source> getSourceById(@PathVariable Long id) {
        Optional<Source> source = sourceRepository.findById(id);
        return source.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new source
    @PostMapping
    public Source createSource(@RequestBody Source source) {
        return sourceRepository.save(source);
    }

    // Update source by id
    @PutMapping("/{id}")
    public ResponseEntity<Source> updateSource(@PathVariable Long id, @RequestBody Source updatedSource) {
        Optional<Source> sourceData = sourceRepository.findById(id);
        if (sourceData.isPresent()) {
            Source source = sourceData.get();
            source.setSource(updatedSource.getSource());
            Source savedSource = sourceRepository.save(source);
            return ResponseEntity.ok(savedSource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete source by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSource(@PathVariable Long id) {
        Optional<Source> source = sourceRepository.findById(id);
        if (source.isPresent()) {
            sourceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

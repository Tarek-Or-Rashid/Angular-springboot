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

import com.tendersys.model.Location;
import com.tendersys.repository.LocationRepository;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    // Get all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Get location by id
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        Optional<Location> location = locationRepository.findById(id);
        return location.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new location
    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationRepository.save(location);
    }

    // Update location by id
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location updatedLocation) {
        Optional<Location> locationData = locationRepository.findById(id);
        if (locationData.isPresent()) {
            Location location = locationData.get();
            location.setState(updatedLocation.getState());
            location.setDistrict(updatedLocation.getDistrict());
            location.setAddress(updatedLocation.getAddress());
            Location savedLocation = locationRepository.save(location);
            return ResponseEntity.ok(savedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete location by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            locationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
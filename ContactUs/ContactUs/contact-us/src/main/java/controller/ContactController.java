package controller;

import entity.Contact;
import repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // Get all contacts
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Create a new contact
    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    // Update a contact
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            Contact updatedContact = contact.get();
            updatedContact.setName(contactDetails.getName());
            updatedContact.setEmail(contactDetails.getEmail());
            updatedContact.setMessage(contactDetails.getMessage());
            return ResponseEntity.ok(contactRepository.save(updatedContact));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a contact
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            contactRepository.delete(contact.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
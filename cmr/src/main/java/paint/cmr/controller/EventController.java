package paint.cmr.controller;

import org.springframework.web.bind.annotation.*;
import paint.cmr.model.Event;
import paint.cmr.repository.EventRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class EventController {
    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable("id") UUID id) {
        return eventRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Optional<Event> updateEvent(@PathVariable("id") UUID id, @RequestBody Event event) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            event.setId(id);
            return Optional.of(eventRepository.save(event));
        } else {
            return Optional.empty();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable("id") UUID id) {
        eventRepository.deleteById(id);
    }
}

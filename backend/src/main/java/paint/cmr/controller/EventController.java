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

    /**
     * Endpoint for creating a new event.
     *
     * @param event The event object to be created.
     * @return The created event object.
     */
    @PostMapping("/dashboard")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    /**
     * Endpoint for retrieving all events.
     *
     * @return A list of all events.
     */
    @GetMapping("/dashboard")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    /**
     * Endpoint for retrieving an event by ID.
     *
     * @param id The ID of the event to retrieve.
     * @return The event object if found, otherwise empty.
     */
    @GetMapping("/dashboard/{id}")
    public Optional<Event> getEventById(@PathVariable("id") UUID id) {
        return eventRepository.findById(id);
    }

    /**
     * Endpoint for updating an existing event.
     *
     * @param id    The ID of the event to update.
     * @param event The updated event object.
     * @return The updated event object if found, otherwise empty.
     */
    @PutMapping("/dashboard/{id}")
    public Optional<Event> updateEvent(@PathVariable("id") UUID id, @RequestBody Event event) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            event.setId(id);
            return Optional.of(eventRepository.save(event));
        } else {
            return Optional.empty();
        }
    }

    /**
     * Endpoint for deleting an event by ID.
     *
     * @param id The ID of the event to delete.
     */
    @DeleteMapping("/dashboard/{id}")
    public void deleteEvent(@PathVariable("id") UUID id) {
        eventRepository.deleteById(id);
    }
}
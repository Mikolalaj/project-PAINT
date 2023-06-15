package paint.cmr.service;

import org.springframework.stereotype.Service;
import paint.cmr.controller.EventController;
import paint.cmr.model.Event;
import paint.cmr.model.User;
import paint.cmr.repository.EventRepository;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Returns a list of all events.
     *
     * @return List of events.
     */
    public List<Event> allEvents(){
        return eventRepository.findAll();
    }
}
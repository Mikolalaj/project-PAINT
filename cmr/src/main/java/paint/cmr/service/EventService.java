package paint.cmr.service;

import paint.cmr.controller.EventController;
import paint.cmr.model.Event;
import paint.cmr.model.User;
import paint.cmr.repository.EventRepository;

import java.util.List;

public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    public List<Event> allUsers(){
        return eventRepository.findAll();
    }
}

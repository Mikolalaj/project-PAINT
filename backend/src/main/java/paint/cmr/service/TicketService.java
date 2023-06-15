package paint.cmr.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import paint.cmr.model.Ticket;
import paint.cmr.repository.TicketRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    /**
     * Adds a new ticket.
     *
     * @param ticket The ticket to add.
     * @return The added ticket.
     */
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    /**
     * Deletes a ticket by its ID.
     *
     * @param id The ID of the ticket to delete.
     */
    public void deleteTicket(UUID id){
        ticketRepository.deleteById(id);
    }

    /**
     * Returns a list of all tickets.
     *
     * @return List of tickets.
     */
    public List<Ticket> allTickets(){
        return ticketRepository.findAll();
    }

    /**
     * Retrieves a ticket by its ID.
     *
     * @param id The ID of the ticket to retrieve.
     * @return The retrieved ticket, if found.
     */
    public Optional<Ticket> idTicket(UUID id){
        return ticketRepository.findById(id);
    }
}
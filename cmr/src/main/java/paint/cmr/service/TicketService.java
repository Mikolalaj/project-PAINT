package paint.cmr.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import paint.cmr.model.Ticket;
import paint.cmr.repository.TicketRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    public Ticket addTicket(@RequestBody Ticket ticket){return ticketRepository.save(ticket);}
    public void deleteTicket(UUID id){ticketRepository.deleteById(id);}
    public List<Ticket> allTickets(){return ticketRepository.findAll();}
    public Ticket idTicket(UUID id){return ticketRepository.findById(id)}
}

import { Event as EventModel } from "../events/event.model";
import { Ticket } from "../tickets/ticket.model";

export const AnalyticsService = {
  async byEvent(creatorId: string) {
    const events = await EventModel.find({ creator: creatorId });

    return Promise.all(
      events.map(async (event: any) => {
        const totalTickets = await Ticket.countDocuments({
          event: event._id,
        });

        const scanned = await Ticket.countDocuments({
          event: event._id,
          scanned: true,
        });

        return {
          eventId: event._id,
          eventTitle: event.title,
          totalTickets,
          scanned,
        };
      })
    );
  },
};

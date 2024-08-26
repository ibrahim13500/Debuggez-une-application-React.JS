import React, { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    
    const events = type 
      ? data.events.filter((event) => event.type === type) 
      : data.events;

    return events.filter((event, index) => (
      (currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index
    ));
  }, [data, type, currentPage]);

  const pageNumber = useMemo(() => Math.ceil(filteredEvents.length / PER_PAGE), [filteredEvents]);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType || null);
  };

  const typeList = useMemo(() => new Set(data?.events.map((event) => event.type)), [data]);

  if (error) {
    return <div>An error occurred</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={Array.from(typeList)}
        onChange={changeType}
      />
      <div id="events" className="ListContainer">
        {filteredEvents.map((event) => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <EventCard
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
              />
            )}
          </Modal>
        ))}
      </div>
      <div className="Pagination">
        {Array.from({ length: pageNumber }, (_, n) => (
          <button
            key={n}
            type="button" // Ensure button element is correctly typed
            onClick={() => setCurrentPage(n + 1)}
            className={currentPage === n + 1 ? 'active' : ''}
            aria-current={currentPage === n + 1 ? 'page' : undefined} // Accessibility improvement
          >
            {n + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EventList;

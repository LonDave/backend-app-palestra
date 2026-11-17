-- Dati di esempio della Palestra Atlante (da inserire quando il database è vuoto)

INSERT INTO corsi (id, nome, istruttore, livello, posti) VALUES
  (1, 'Yoga',     'Giulia Neri', 'base',       12),
  (2, 'Pilates',  'Marco Riva',  'intermedio', 10),
  (3, 'CrossFit', 'Sara Galli',  'avanzato',    2),
  (4, 'Zumba',    'Luca Ferri',  'base',       15),
  (5, 'Spinning', 'Anna Conti',  'intermedio',  8);

INSERT INTO soci (id, nome, email) VALUES
  (1, 'Paolo Bianchi',  'paolo.bianchi@example.com'),
  (2, 'Chiara Russo',   'chiara.russo@example.com'),
  (3, 'Davide Moretti', 'davide.moretti@example.com'),
  (4, 'Elena Colombo',  'elena.colombo@example.com'),
  (5, 'Franco Marino',  'franco.marino@example.com');

INSERT INTO prenotazioni (id, socio_id, corso_id) VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 1),
  (4, 1, 3),
  (5, 4, 3),
  (6, 2, 2),
  (7, 5, 5);

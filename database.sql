CREATE TABLE shoes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80),
	cost INTEGER
	);
	
INSERT INTO shoes (name, cost)
VALUES ('Rainbow Sandals', '60'),
('Brooks Ghosts', '100'),
('Big Rubber Galoshes', '20');

INSERT INTO shoes (name, cost)
VALUES ('Red Wing', '120'),

SELECT * FROM shoes;
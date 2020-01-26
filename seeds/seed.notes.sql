INSERT INTO notes (note_name, modified, folderid, content)
    VALUES
        ('malek-note',  now() -'4 days'::INTERVAL, 1, 'Reprehenderit Lorem cupidatat veniam aute officia proident mollit ullamco.'),
        ('alan-note',   now() -'3 days'::INTERVAL, 1, 'Consectetur do laboris incididunt pariatur ut ex qui quis tempor exercitation.'),
        ('grace-note',  now() -'2 days'::INTERVAL, 2, 'Aliquip commodo minim ad est esse pariatur ullamco sit.'),
        ('gary-note',   now() -'1 days'::INTERVAL, 4, 'Ut eiusmod reprehenderit labore est sit.');
     
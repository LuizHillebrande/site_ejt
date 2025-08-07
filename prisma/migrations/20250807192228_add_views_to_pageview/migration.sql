-- Primeiro, adiciona a coluna views
ALTER TABLE PageView ADD COLUMN views INTEGER NOT NULL DEFAULT 0;

-- Remove duplicatas mantendo apenas o registro mais recente de cada página
DELETE FROM PageView
WHERE id NOT IN (
  SELECT MAX(id)
  FROM PageView
  GROUP BY page
);

-- Adiciona a constraint unique na coluna page
CREATE UNIQUE INDEX PageView_page_key ON PageView(page);

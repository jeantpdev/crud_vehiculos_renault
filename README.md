# Información
Se extrajo data usando web scrapping de la página OLX

Toda la información extraída está almacenada en una base de datos usando **supabase**

La data puede ser manipulada desde la página de "tabla" en donde se encuentra un CRUD

### Problema con el CRUD
El **update** no funciona ya que la URL de la API que ofrece **supabase** no la entiendo, por lo cual, no se pueden actualizar datos

### Bug en el CRUD - UPDATE no funcional
Cada vez que se actualiza un dato, se eliminaxd

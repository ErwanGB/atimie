package fr.erwan.tp;

import java.util.List;

// Une interface générique DAO permet d'harmoniser les noms de methode dans les DAO

public interface DAO<T> {
	
	// On utilise T pour permettre d'utiliser l'interface avec différentes classe (personne,produits)	
	public List<T> findAll();
	
	
	public T findOne(T data);
	
	
	public T findOne(Integer id);
	
	// Renvoi un objet pour verif
	public T insert(T data);
	
	public void update(T data);
		
	public void delete(T data);
	
	public void delete(Integer id);
	
	public void delete(List<T> data);
	
	public void deleteAll();

}

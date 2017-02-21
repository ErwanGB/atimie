package fr.erwan.tp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmpruntDAO extends AbstractDAO<Emprunt>{
	
	@Override
	public List<Emprunt> findAll() {
		String sql = 
				"SELECT emprunt.id , id_membre , lastname , id_livre,"
				+ "title , date_start "
				+ "FROM emprunt "
				+ "INNER JOIN membre "
				+ "ON id_membre = membre.id "
				+ "INNER JOIN livre "
				+ "ON id_livre = livre.id";				
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);
				ResultSet result = statement.executeQuery()) {
			List<Emprunt> list = new ArrayList<>();
			while (result.next()) {
				Emprunt emprunt = mapResultToDTO(result);
				emprunt.setId(result.getInt("id"));
				list.add(emprunt);
			}
			return list;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public Emprunt findOne(Emprunt data) {
		return findOne(data.getId());
	}

	@Override
	public Emprunt findOne(Integer id) {
		String sql = " SELECT id_membre , id_livre , date_start FROM emprunt WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			try (ResultSet result = statement.executeQuery();) {
				result.next();
				Emprunt emprunt = mapResultToDTO(result);
				emprunt.setId(id);
				return emprunt;
			}
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	private Emprunt mapResultToDTO(ResultSet result) throws SQLException {
		Emprunt emprunt = new Emprunt();
		emprunt.setId_membre(result.getInt("id_membre"));
		emprunt.setId_livre(result.getInt("id_livre"));
		emprunt.setDate_start(result.getDate("date_start"));
		emprunt.setNom_membre(result.getString("lastname"));
		emprunt.setTitre_livre(result.getString("title"));
		return emprunt;
	}

	@Override
	public Emprunt insert(Emprunt data) {
		String sql = " INSERT INTO emprunt ( id_membre , id_livre ) VALUES ( ? , ? ) ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);) {
			fillStatement(data, statement, false);
			statement.executeUpdate();
			// récupère l'id après insertion
			ResultSet keys = statement.getGeneratedKeys();
			keys.next();
			// alimente le dto avec l'id trouvé
			data.setId(keys.getInt(1));
			return data;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public void update(Emprunt data) {

	}

	private void fillStatement(Emprunt data, PreparedStatement statement, boolean isUpdate) throws SQLException {
		int index = 1;
		statement.setInt(index++, data.getId_membre());
		statement.setInt(index++, data.getId_livre());
		if (isUpdate) {
			statement.setInt(index++, data.getId());
		}
	}

	@Override
	public void delete(Emprunt data) {
		delete(data.getId());
	}

	@Override
	public void delete(Integer id) {
		String sql = " DELETE FROM emprunt WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public void delete(List<Emprunt> data) {
		for (Emprunt emprunt : data) {
			delete(emprunt);
		}
	}

	@Override
	public void deleteAll() {
		String sql = " DELETE FROM emprunt ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

}

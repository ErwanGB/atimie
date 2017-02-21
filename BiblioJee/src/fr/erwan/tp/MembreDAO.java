package fr.erwan.tp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MembreDAO extends AbstractDAO<Membre> {

	@Override
	public List<Membre> findAll() {
		String sql = " SELECT id , firstname , lastname FROM membre ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);
				ResultSet result = statement.executeQuery()) {
			List<Membre> list = new ArrayList<>();
			while (result.next()) {
				Membre membre = mapResultToDTO(result);
				membre.setId(result.getInt("id"));
				list.add(membre);
			}
			return list;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public Membre findOne(Membre data) {
		return findOne(data.getId());
	}

	@Override
	public Membre findOne(Integer id) {
		String sql = " SELECT firstname , lastname FROM membre WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			try (ResultSet result = statement.executeQuery();) {
				result.next();
				Membre membre = mapResultToDTO(result);
				membre.setId(id);
				return membre;
			}
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	private Membre mapResultToDTO(ResultSet result) throws SQLException {
		Membre membre = new Membre();
		membre.setFirstName(result.getString("firstname"));
		membre.setLastName(result.getString("lastname"));
		return membre;
	}

	@Override
	public Membre insert(Membre data) {
		String sql = " INSERT INTO membre ( firstname , lastname ) VALUES ( ? , ? ) ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);) {
			fillStatement(data, statement, false);
			statement.executeUpdate();
			// r�cup�re l'id apr�s insertion
			ResultSet keys = statement.getGeneratedKeys();
			keys.next();
			// alimente le dto avec l'id trouv�
			data.setId(keys.getInt(1));
			return data;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public void update(Membre data) {
		String sql = " UPDATE membre SET firstname = ? , lastname = ? WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			fillStatement(data, statement, true);
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	private void fillStatement(Membre data, PreparedStatement statement, boolean isUpdate) throws SQLException {
		int index = 1;
		statement.setString(index++, data.getFirstName());
		statement.setString(index++, data.getLastName());
		if (isUpdate) {
			statement.setInt(index++, data.getId());
		}
	}

	@Override
	public void delete(Membre data) {
		delete(data.getId());
	}

	@Override
	public void delete(Integer id) {
		String sql = " DELETE FROM membre WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public void delete(List<Membre> data) {
		for (Membre membre : data) {
			delete(membre);
		}
	}

	@Override
	public void deleteAll() {
		String sql = " DELETE FROM membre ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

}

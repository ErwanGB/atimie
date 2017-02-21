package fr.erwan.tp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LivreDAO extends AbstractDAO<Livre> {

	@Override
	public List<Livre> findAll() {
		String sql = " SELECT livre.id , livre.title , livre.author FROM livre ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);
				ResultSet result = statement.executeQuery()) {
			List<Livre> list = new ArrayList<>();
			while (result.next()) {
				Livre livre = mapResultToDTO(result);
				livre.setId(result.getInt("id"));
				list.add(livre);
			}
			return list;
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public Livre findOne(Livre data) {
		return findOne(data.getId());
	}

	@Override
	public Livre findOne(Integer id) {
		String sql = " SELECT title , author FROM livre WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			try (ResultSet result = statement.executeQuery();) {
				result.next();
				Livre livre = mapResultToDTO(result);
				livre.setId(id);
				return livre;
			}
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	private Livre mapResultToDTO(ResultSet result) throws SQLException {
		Livre livre = new Livre();
		livre.setTitle(result.getString("title"));
		livre.setAuthor(result.getString("author"));
		return livre;
	}

	@Override
	public Livre insert(Livre data) {
		String sql = " INSERT INTO livre ( title , author ) VALUES ( ? , ? ) ";
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
	public void update(Livre data) {
		String sql = " UPDATE livre SET title = ? , author = ? WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			fillStatement(data, statement, true);
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	private void fillStatement(Livre data, PreparedStatement statement, boolean isUpdate) throws SQLException {
		int index = 1;
		statement.setString(index++, data.getTitle());
		statement.setString(index++, data.getAuthor());
		if (isUpdate) {
			statement.setInt(index++, data.getId());
		}
	}

	@Override
	public void delete(Livre data) {
		delete(data.getId());
	}

	@Override
	public void delete(Integer id) {
		String sql = " DELETE FROM livre WHERE id = ? ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.setInt(1, id);
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public void delete(List<Livre> data) {
		for (Livre livre : data) {
			delete(livre);
		}
	}

	@Override
	public void deleteAll() {
		String sql = " DELETE FROM livre ";
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(sql);) {
			statement.executeUpdate();
		} catch (SQLException ex) {
			throw new RuntimeException(ex);
		}
	}

}

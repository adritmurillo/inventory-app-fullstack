package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.User;
import java.util.List;

public interface UserServicePort {
    List<User> findAll();
    User createUser(User user);
    void deleteUser(Long id);
}
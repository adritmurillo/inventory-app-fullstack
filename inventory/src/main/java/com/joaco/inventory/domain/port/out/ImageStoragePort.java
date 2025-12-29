package com.joaco.inventory.domain.port.out;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStoragePort {
    String uploadImage(MultipartFile file);
}

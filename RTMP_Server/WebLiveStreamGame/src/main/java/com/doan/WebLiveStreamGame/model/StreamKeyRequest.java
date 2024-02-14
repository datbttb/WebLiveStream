package com.doan.WebLiveStreamGame.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class StreamKeyRequest {
    @NonNull
    private String username;

    @NonNull
    private long mayChu;

    public StreamKeyRequest() {
    }

    public StreamKeyRequest(@NonNull String username, @NonNull long mayChu) {
        this.username = username;
        this.mayChu = mayChu;
    }
}

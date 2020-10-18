package com;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("User firstname")
    private String firstName;
    @SerializedName("User lastname")
    private String lastName;
    @SerializedName("User ID")
    private final Long userChatId;
    @SerializedName("Session settings")
    private Session currentSession;
    @SerializedName("Online")
    private boolean onlineStatus;
    @SerializedName("Busy")
    private boolean isBusy;
    @SerializedName("Has geolocation")
    private boolean hasGeo;
    @SerializedName("Stream geo point")
    private String geoPoint;
    @SerializedName("Got order")
    private boolean gotOrder;
    @SerializedName("Rating")
    private double rating = 4.5;



    public User() {
        userChatId = 0L;
        currentSession = null;
        firstName = "DefaultFirstName";
        lastName = "DefaultLastName";
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getGeoPoint() {
        return geoPoint;
    }

    public void setGeoPoint(String geoPoint) {
        this.geoPoint = geoPoint;
    }

    public boolean isGotOrder() {
        return gotOrder;
    }

    public void setGotOrder(boolean gotOrder) {
        this.gotOrder = gotOrder;
    }

    public boolean hasGeo() {
        return hasGeo;
    }

    public void setHasGeo(boolean hasGeo) {
        this.hasGeo = hasGeo;
    }

    public User(Long userChatId) {
        this.userChatId = userChatId;
    }

    public boolean isOnlineStatus() {
        return onlineStatus;
    }

    public void setOnlineStatus(boolean onlineStatus) {
        this.onlineStatus = onlineStatus;
    }

    public boolean isBusy() {
        return isBusy;
    }

    public void setBusy(boolean busy) {
        isBusy = busy;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getUserChatId() {
        return userChatId;
    }



    public Session getCurrentSession() {
        return currentSession;
    }

    public void setCurrentSession(Session currentSession) {
        this.currentSession = currentSession;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userChatId=" + userChatId +
                ", currentSession=" + currentSession +
                ", onlineStatus=" + onlineStatus +
                ", isBusy=" + isBusy +
                ", hasGeo=" + hasGeo +
                ", geoPoint='" + geoPoint + '\'' +
                '}';
    }

    public String getLastName() {
        return lastName;
    }
}

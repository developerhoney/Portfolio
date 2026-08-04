/* Our Work Styling */
.work {
    padding: 80px 20px;
    text-align: center;
}

.section-title {
    font-size: 2.2rem;
    margin-bottom: 10px;
}

.section-subtitle {
    color: #94a3b8;
    margin-bottom: 40px;
    font-size: 1rem;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1100px;
    margin: 0 auto;
}

.portfolio-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    text-align: left;
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.portfolio-card:hover {
    transform: translateY(-8px);
    border-color: #3b82f6;
}

.portfolio-img img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.portfolio-info {
    padding: 20px;
}

.portfolio-info h3 {
    margin-bottom: 8px;
    color: #fff;
    font-size: 1.2rem;
}

.portfolio-info p {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
}

.portfolio-btn {
    display: inline-block;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.portfolio-btn:hover {
    color: #60a5fa;
}
